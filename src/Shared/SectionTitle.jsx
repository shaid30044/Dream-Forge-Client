const SectionTitle = ({ title }) => {
  return (
    <div className="text-center pb-10 lg:pb-20">
      <h1 className="text-xl md:text-3xl lg:text-5xl lg:font-light text-primary">
        -------- <span className="text-primary">{title}</span> --------
      </h1>
    </div>
  );
};

export default SectionTitle;
