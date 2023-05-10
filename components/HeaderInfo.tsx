import { Heading } from "native-base";

type Props = {
  title: string;
  subtitle: string;
};

export function HeaderInfo({ title, subtitle }: Props) {
  return (
    <>
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        {title}
      </Heading>
      <Heading size="xs" fontWeight="medium" color="coolGray.600" mt="1">
        {subtitle}
      </Heading>
    </>
  );
}
