function Contacts() {
  const cases = [
    {
      id: 1,
      branchId: 101,
      counterId: 201,
      extensionId: 301,
    },
    {
      id: 2,
      branchId: 101,
      counterId: 201,
      extensionId: 302,
    },
    {
      id: 3,
      branchId: 102,
      counterId: 202,
      extensionId: 301,
    },
    // More case objects...
  ];

  // Group cases by branch, counter, and extension
  const groupedCases = cases.reduce((groups, currentCase) => {
    const { branchId, counterId, extensionId } = currentCase;
    const groupKey = `${branchId}_${counterId}_${extensionId}`;

    if (!groups[groupKey]) {
      groups[groupKey] = {
        branchId,
        counterId,
        extensionId,
        cases: [],
      };
    }

    groups[groupKey].cases.push(currentCase);
    return groups;
  }, {});

  console.log(Object.keys(groupedCases));

  // Convert the object of groups into an array
  const groupsArray = Object.values(groupedCases);

  // Now you have an array of groups where each group contains cases grouped by branch, counter, and extension
  console.log(groupsArray);

  return <div>hi</div>;
}

export default Contacts;
