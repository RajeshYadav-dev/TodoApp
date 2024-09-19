import React, { useState, useEffect } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleOnInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    if (task.includes(trimmedValue)) return;

    setTask((prev) => [...prev, trimmedValue]);
    setInputValue("");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formateDate = now.toLocaleDateString();
      const formateTime = now.toLocaleTimeString();
      setDateTime(`${formateDate} - ${formateTime}`);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleDeleteTodo = (value) => {
    const updateData = task.filter((current) => current !== value);
    setTask(updateData); // Correctly update the tasks
  };

  const handleClearTodo = () => {
    setTask([]); // Clear all tasks
  };

  return (
    <>
      <div className="container m-4 ">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header" style={{ textAlign: "center" }}>
                Welcome Rajesh Todo App
              </div>
              <div className="card-body">
                <div className="row justify-content-center">
                  <div
                    className="col-md-8 offset-md-2 "
                    style={{
                      border: "2px solid black ",
                      width: "210px",
                      marginBottom: "20px",
                      color: "black",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      backgroundColor: "ButtonShadow",
                    }}
                  >
                    {dateTime}
                  </div>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-control mb-4"
                    type="text"
                    placeholder="Enter todo"
                    value={inputValue}
                    onChange={handleOnInputChange}
                  />
                  <div className="d-grid gap-2 col-6 mx-auto m-4">
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
                <ul>
                  {task.map((item, index) => (
                    <li key={index} style={{ listStyle: "none" }}>
                      <div className="card">
                        <div className="card-body">
                          <div style={{ fontWeight: "bolder" }}>{item}</div>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                              className="btn btn-outline-info me-md-2"
                              type="button"
                            >
                              Check
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              type="button"
                              onClick={() => handleDeleteTodo(item)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {task.length > 0 && (
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={handleClearTodo}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
