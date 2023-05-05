const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
  
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
  
      password: {
        type: String,
        required: true,
      },
  
      role: {
        type: String,
        enum: ['pet service worker', 'pet owner'],
        required: true,
      },
  
      pets: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Pet',
        },
      ],
    }
);
  

// create hash for user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});


// compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;