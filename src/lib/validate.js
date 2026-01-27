export async function validateRequest(req, schema) {
  const body = await req.json();

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    throw {
      status: 400,
      message: "Validation failed",
      errors,
    };
  }

  return parsed.data;
}
