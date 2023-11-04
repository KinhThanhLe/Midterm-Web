class User {
  constructor(
    fullName,
    username,
    password,
    createdAt,
    updatedAt,
    email,
    phoneNumber,
    birthday,
    socialId,
    address
  ) {
    this.full_name = fullName;
    this.username = username;
    this.password = password;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
    this.email = email;
    this.phone_number = phoneNumber;
    this.birthday = birthday;
    this.social_id = socialId;
    this.address = address;
  }
}

module.exports = User;
