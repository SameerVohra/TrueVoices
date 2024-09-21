interface URL{
  compName: string,
  compId: string,
}
export const GenerateURL = ({compName, compId}: URL): string => {
  let url: string = "https://truevoices.vercel.app";
  url+="/add-review"
  url+="/"+compName;
  url+="/"+compId;
  return url;
}
