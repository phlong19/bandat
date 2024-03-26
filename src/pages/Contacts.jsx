const { useEffect, useState } = React;
const { Flex, Loader } = MantineCore;
const { useFormContext, Controller } = Form;

function ReportComponent() {
  const { ctx, screenId } = useFlowViewer();
  const { onSubmit, onCancel } = useScreenActions();
  const { control, setValue } = useFormContext();
  const data = ctx.getAllCases;
  console.log(ctx);
  const [groupedData, setGroupedData] = useState({});
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Perform Group By Branch and Counter GD (Branch Counter)
    const groupByBranchAndCounter = data.reduce((acc, currCase) => {
      const { branch, counterGd } = currCase;
      const key = `${branch}-${counterGd}`;

      if (!acc[key]) {
        acc[key] = {
          totalTransactions: 0,
          totalOperationalTime: 0,
          cases: [],
        };
      }

      acc[key].totalTransactions += 1;
      acc[key].totalOperationalTime += currCase.operationalTime;
      acc[key].cases.push(currCase);

      return acc;
    }, {});

    Object.keys(groupByBranchAndCounter).forEach((key) => {
      const group = groupByBranchAndCounter[key];
      group.averageOperationalTime =
        group.totalOperationalTime / group.totalTransactions;
    });

    setGroupedData(groupByBranchAndCounter);
    setValue(`${screenId}.customInput`, groupedData);
    setIsDone(true);
  }, [data, groupedData, screenId, setValue]);

  useEffect(() => {
    if (isDone) {
      onSubmit();
    }
  }, [isDone, onSubmit]);

  return (
    <Flex justify="center" align="center">
      <Loader />
      <Controller
        name={`${screenId}.customInput`}
        control={control}
        render={({ field }) => <input {...field} type="hidden" />}
      />
    </Flex>
  );
}

export default ReportComponent;
