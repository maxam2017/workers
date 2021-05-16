export default async function bodyParser(req: Request): Promise<any> {
  const { headers } = req;
  const contentType = headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return req.json();
  }

  if (
    contentType.includes("application/text") ||
    contentType.includes("text/html")
  ) {
    return req.text();
  }

  if (contentType.includes("form")) {
    const formData = await req.formData();

    return [...formData.entries()].reduce(
      (prev, cur) => ({ ...prev, [cur[0]]: cur[1] }),
      {}
    );
  }

  return URL.createObjectURL(await req.blob());
}
