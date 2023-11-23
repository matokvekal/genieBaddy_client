import { useState } from "react";
import "./FilterModal.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import ButtonFilter from "components/ButtonFilter/ButtonFilter";

const FilterModal = () => {
  const { handleFilterModal, filterModalState } = useStore(useDataStore);

  const handleOpen = () => {
    handleFilterModal(false);
    console.log("open");
  };
  const handleClosed = () => {

    handleFilterModal(false);
    console.log("closed");
  };

  const handleSaved = () => {
    handleFilterModal(false);
    console.log("saved");
  };
  return (
    <>
      <div className={`filter-modal ${filterModalState ? "open" : ""}`}>
        <div className="filter-modal-container">
          <div onClick={handleOpen}>
            <ButtonFilter
              className="ButtonFilter"
              text="Open"
              items={2}
            ></ButtonFilter>
          </div>
          <div onClick={handleClosed}>
            <ButtonFilter
              className="ButtonFilter"
              text="Closed"
              items={2}
            ></ButtonFilter>
          </div>
          <div onClick={handleSaved}>
            <ButtonFilter
              className="ButtonFilter"
              text="Saved"
              items={2}
            ></ButtonFilter>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
