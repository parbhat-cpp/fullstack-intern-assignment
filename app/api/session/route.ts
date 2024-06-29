import jwt from 'jsonwebtoken';
import { users } from "@/users";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {
    try {
        const headersList = headers();
        const token = headersList.get("token") as string;

        if (!token) {
            return NextResponse.json({
                message: "Please provide token"
            });
        }

        const tokenVerify: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = users.find(user => user.id === tokenVerify.id);

        if (user) {
            return NextResponse.json({
                id: user.id,
                username: user.username,
            });
        } else {
            return NextResponse.json({
                message: "Invalid token"
            }, {
                status: 401
            });
        }
    } catch (error) {
        return NextResponse.json({
            error: "Invalid token"
        }, {
            status: 401
        });
    }
}
