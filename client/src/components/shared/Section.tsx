// Tạo Catalog Filter
const Section = (props: any) => {
  return <div className="section">{props.children}</div>;
};

export const SectionTitle = (props: any) => {
  return <div className="section_title">{props.children}</div>;
};

export const SectionBody = (props: any) => {
  return <div className="section_body">{props.children}</div>;
};

export default Section;
