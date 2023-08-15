import {
  NamingConvention,
  ScriptingLanguageType,
} from "~/entities/config/lib/types/fsd-config.interface";
import { formatTextByConvention } from "../../../../shared/lib/utils/case-text";

export const storyBookTemplate = ({
  sliceName,
  scriptingLanguage = "javascript",
  namingConvention,
}: {
  sliceName: string;
  scriptingLanguage?: ScriptingLanguageType;
  namingConvention: NamingConvention;
}) => {
  const fileName = formatTextByConvention(sliceName, namingConvention.file);
  const componentName = formatTextByConvention(
    sliceName,
    namingConvention.component,
  );

  if (scriptingLanguage === "typescript")
    return `import type { Meta, StoryObj } from '@storybook/react';

import { ${componentName} } from "./${fileName}";

const meta = {
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <${componentName} />,
};`;
  return `import { ${componentName} } from "./${fileName}";

export default {
  component: ${componentName},
};

export const Primary = {
  render: () => <${componentName} />,
};`;
};
