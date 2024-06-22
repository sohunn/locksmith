import SaveForm from "./SaveForm";

const Save = () => {
  return (
    <section
      className="py-4 bg-center bg-no-repeat bg-cover bg-scroll min-h-svh"
      style={{ backgroundImage: 'url("/save.jpg")' }}
    >
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <h1 className="text-2xl text-center mb-4">
          Let&apos;s secure a password
        </h1>
        <SaveForm />
      </div>
    </section>
  );
};

export default Save;
