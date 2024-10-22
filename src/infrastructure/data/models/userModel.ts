import mongoose from "mongoose";



class UserModel {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address[];

    constructor(firstName: string, lastName: string, phoneNumber: string, address?: Address[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address || [];
    }
}

class Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;

    constructor(street: string, city: string, state: string, postalCode: string) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }
}

interface UserModelScheme extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address[];
}


// Define the Mongoose schema for UserModel
const UserSchema = new mongoose.Schema<UserModelScheme>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: [AddressSchema], required: false, default: [] } // Address is optional
});

// Export the Mongoose model
const UserModelFinal = mongoose.model<UserModelScheme>("User", UserSchema);

export default UserModel