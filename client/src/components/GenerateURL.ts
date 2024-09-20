interface URL{
  compName: string | null | undefined,
  compId: string | null | undefined,
}
export const GenerateURL = ({compName, compId}: URL): string | null => {
  let url: string = "http://localhost:5173";
  url+="/add-review"
  url+="/"+compName;
  url+="/"+compId;
  return url;
}
