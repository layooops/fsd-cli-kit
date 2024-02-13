import { kebabCasedText } from "~/shared/lib/utils/case-text";

export const cssTemplate = ({ sliceName }: { sliceName: string }) => {
  const cssName = kebabCasedText(sliceName);

  return `.${cssName} {
  color: #000;
}`;
};
