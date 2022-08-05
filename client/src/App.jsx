import { useState } from "react";
import { Header, Footer, Loader, Services, Transaction, Welcome } from "../components";

function App() {
  return (
    <div className="min-h-screen ">
      <div className="gradient-bg-welcome">
        <Header />
        <Welcome />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  );
}

export default App;
