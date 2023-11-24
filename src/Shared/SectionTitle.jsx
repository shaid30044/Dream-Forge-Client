const SectionTitle = ({ title }) => {
  return (
    <div className="text-center pb-20">
      <h1 className="text-5xl font-light text-primary">
        -------- <span className="text-primary">{title}</span> --------
      </h1>
    </div>
  );
};

export default SectionTitle;
