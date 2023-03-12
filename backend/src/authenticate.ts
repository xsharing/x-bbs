import jsonwebtoken from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";

export const autheticate = async (resolve, root, args, context, info) => {
    try {
        context.verifiedToken = jsonwebtoken.verify(context.request.get("Authorization"), "secret");
    } catch (e) {
        throw 'not authorized';
    }
    const result = await resolve(root, args, context, info);
    return result;
};