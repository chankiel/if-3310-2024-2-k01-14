import { Sidebar } from "../../components";
import { RequestCard } from "../../components/Connection";

const Requests = () => {
  return (
    <>
      <Sidebar />
      <section className="py-5">
        <h1 className="px-5 text-xl font-semibold mb-3">Manage Requests</h1>
        <RequestCard/>
        <RequestCard/>
        <RequestCard/>
        <RequestCard/>
      </section>
    </>
  );
};

export default Requests;
