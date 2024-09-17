interface URL{
  compName: string,
  compId: string,
}
export const GenerateURL = ({compName, compId}: URL): string => {
  let url: string = "http://localhost:5173";
  url+="/add-review"
  url+="/"+compName;
  url+="?id="+compId;
  return url;
}
