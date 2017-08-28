import * as mongo from "mongodb";
import * as db from "./Database";
import * as action from "./Action";
import * as crypto from "crypto";

export async function handleData(_data: action.AuthData): Promise<string> {
    console.log("Auth handling Data");
    switch (_data.action) {
        case "create":
            try {
                return await createUser(_data);
            } catch (error) {
                console.log(error);
                return "Account Creation Error"
            }
        case "login":
            try {
                return await loginUser(_data);
            } catch (error) {
                console.log(error);
                return "Login Error"
            }
    }
}

async function createUser(_data: action.AuthData): Promise<string> {
    console.log("creating User");
    try {
        let cursor: mongo.Cursor<any> = await db.read("users", {"user": _data.user});
        let check: number = await cursor.count();

        if (check != 0) {
            console.log("CHECK CHECK");
            return "User Already Exists";
        }
        else {
            await db.write("users",{"user": _data.user, "password": hashPassword(_data.password)});
            return "User created successfully";
        }
    } catch (_error) {
        return _error;
    }
}

async function loginUser(_data: action.AuthData): Promise<string> {
    console.log("Login User");
    try {
        let cursor: mongo.Cursor<any> = await db.read("users", {"user": _data.user, "password": hashPassword(_data.password)});
        if (await cursor.count() > 1) {
            return "More than one possible user. Please contact administrator";
        } else if (await cursor.count() < 1) {
            return "Incorrect login credentials"
        }
        return "Credentials match"
    } catch (error) {
        console.log(error);
        return "Login Error";
    }
}

function hashPassword(_password: string): string {
    console.log("Hashing password");
    let hash = crypto.createHash("sha256");
    hash.update(_password);
    return hash.digest("hex");
}