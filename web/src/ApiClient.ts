const ApiClient = async ({
  route,
  init = {},
  statusCodeSuccess = [200, 201],
  bodyFormat = "json",
}: {
  route: string;
  init?: RequestInit;
  statusCodeSuccess?: Array<Number>;
  bodyFormat?: "json" | "text";
}) => {
  try {
    const response = await fetch(`http://localhost:3001/${route}`, {
      headers: {
        "x-lang": "pt-Br"
      },
      ...init,
    });
    if (!statusCodeSuccess.includes(response.status)) {
      const body = await response.text();
      alert(body);
      return 0;
    }
    if (bodyFormat == "text") return await response.text();
    return await response.json();
  } catch (error) {
    console.log(error);
    alert(error);
    return 0;
  }
};

export default ApiClient;
