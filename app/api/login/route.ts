import { users } from "@/users";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const data = await req.json();
        const {username, password} = data;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
            return NextResponse.json({
                id: user.id,
                username: user.username,
                token: token
            });
        } else {
            return NextResponse.json({
                error: "User not found"
            }, {
                status: 401
            });
        }
    } catch (error) {
        return NextResponse.json({
            error: "Failed to login"
        }, {
            status: 500
        });
    }
}

