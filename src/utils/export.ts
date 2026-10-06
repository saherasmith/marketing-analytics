export function downloadCSV<T extends object>(
  data: T[],
  filename: string,
): void {
  if (data.length === 0) {
    return;
  }

  const headers = Object.keys(data[0]);

  const rows = data.map((item) =>
    headers
      .map((header) => {
        const value =
          item[header as keyof T];

        const stringValue =
          value === null ||
          value === undefined
            ? ""
            : String(value);

        return `"${stringValue.replace(
          /"/g,
          '""',
        )}"`;
      })
      .join(","),
  );

  const csv = [
    headers.join(","),
    ...rows,
  ].join("\n");

  downloadFile(
    csv,
    filename,
    "text/csv;charset=utf-8;",
  );
}

export function downloadJSON<T>(
  data: T,
  filename: string,
): void {
  const json = JSON.stringify(
    data,
    null,
    2,
  );

  downloadFile(
    json,
    filename,
    "application/json",
  );
}

function downloadFile(
  content: string,
  filename: string,
  type: string,
): void {
  const blob = new Blob(
    [content],
    {
      type,
    },
  );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;

  anchor.download = filename;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}