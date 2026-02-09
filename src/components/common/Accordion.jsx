const Accordion = ({ id, children }) => {
  return (
    <div className="accordion" id={id}>
      {children}
    </div>
  );
};

export default Accordion;
