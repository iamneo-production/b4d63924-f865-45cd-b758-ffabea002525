import React from "react";

export default function DeletePopup(props) {
  const { label, onSubmit, id } = props;

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="modal-body d-flex justify-content-center"
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/exclamation.svg"
              alt="exclamation"
              style={{ width: 122, height: 122 }}
            />
            <h3>Are you sure?</h3>
            <p>{label}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <button
                id="closeModal"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No, Go Back!
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => onSubmit(e, id)}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
