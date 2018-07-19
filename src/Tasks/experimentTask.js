.then(taskList => {
    let updatedData = [];
    taskList.forEach(i => {
      if (i.completed !== true) {
        updatedData.push(i);
        console.log(updatedData);
      }
    })
    this.setState({ tasks: updatedData });
  });
