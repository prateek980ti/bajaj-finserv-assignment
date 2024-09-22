import { NextResponse } from "next/server";
import z from "zod";

const reqSchema = z.array(z.string());

type TRequest = {
	data: string[];
};

export async function GET() {
	return NextResponse.json({
		operation_code: 1,
	});
}

export async function POST(req: Request) {
	const body = (await req.json()) as TRequest;
	const validationResult = reqSchema.safeParse(body.data);

	if (validationResult.error) {
		console.error(validationResult.error);
		return NextResponse.json({
			is_success: false,
			user_id: "manan_gulati_03111999",
			email: "manangulati9@gmail.com",
			roll_number: "RA2111026030210",
			numbers: [],
			alphabets: [],
			highest_alphabet: [],
		});
	}

	const numbers = body.data.filter((item) => !isNaN(Number(item)));
	const alphabets = body.data.filter((item) => isNaN(Number(item)));

	const highest_alphabet =
		alphabets.length > 0
			? [Math.max(...alphabets.map((alphabet) => alphabet.charCodeAt(0)))]
			: [];

	const res = {
		is_success: true,
		user_id: "manan_gulati_03111999",
		email: "manangulati9@gmail.com",
		roll_number: "RA2111026030210",
		numbers,
		alphabets,
		highest_alphabet:
			highest_alphabet.length > 0
				? [String.fromCharCode(highest_alphabet[0])]
				: [],
	};

	return NextResponse.json(res);
}
