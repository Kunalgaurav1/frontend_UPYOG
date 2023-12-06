import React, { useCallback, useMemo, useEffect } from 'react'
import { SearchForm, Table, Card } from '@egovernments/digit-ui-react-components'
import { useForm, Controller, useWatch } from "react-hook-form";
import SearchReportFields from './SearchReportFields';
// import { useParams } from "react-router-dom";


function SearchReport({ tenantId, t, moduleCode, language,  onSearch, ...props }) {

  // const store = Digit.Services.useStore({ stateCode, moduleCode, language })
  // console.log("data from store data")
  // console.log(store)

  let moduleName = "TL"
  let reportName = "TL"
  const filter = [
    // {
    // "name": "fromDate",
    // "input": fromDate
    // },
    // {
    //   "name": "toDate",
    //   "input": toDate
    // }
  ]

  // const { moduleName, reportName } = useParams();

  // const { isLoading: SearchFormIsLoading, data: SearchFormUIData } = Digit.Hooks.reports.useReportMeta.fetchMetaData(moduleName, reportName, "pb.amritsar")
  const { isLoading: SearchFormIsLoading, data: SearchFormUIData } = Digit.Hooks.reports.useReportMeta.fetchMetaData(moduleName, reportName, tenantId)
  const { isLoading: isLoadingReportsData, data: ReportsData } = Digit.Hooks.reports.useReportMeta.fetchReportData(moduleName, reportName, tenantId, filter, {
    //enabled: !!filter.length > 0
    enabled: true
  })

  // console.log("modulename ", moduleName)
  // console.log("reportname ", reportName)
  // console.log("loading" , SearchFormIsLoading)
  console.log("formuidata: " + SearchFormUIData)
  console.log("reportdata:  " + ReportsData)
  


  const initialValues = Digit.SessionStorage.get("SEARCH_APPLICATION_DETAIL") ? {
    ...Digit.SessionStorage.get("SEARCH_APPLICATION_DETAIL"),
    offset: 0,
    limit: 10,
    sortBy: "commencementDate",
    sortOrder: "DESC"
  } : {
    offset: 0,
    limit: 10,
    sortBy: "commencementDate",
    sortOrder: "DESC"
  };


  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: initialValues
  })

  // console.log("initial value", initialValues)


  // ----- to test out field values --->
  // const applicationType = useWatch({ control, name: "applicationType" });
  const fromDate = useWatch({ control, name: "fromDate" });
  const toDate = useWatch({ control, name: "toDate" });
  // console.log( fromDate, toDate)


  const onSort = useCallback((args) => {
    if (args.length === 0) return
    setValue("sortBy", args.id)
    setValue("sortOrder", args.desc ? "DESC" : "ASC")
  }, [])

  function onPageSizeChange(e){
      setValue("limit",Number(e.target.value))
      handleSubmit(onSubmit)()
  }

  function nextPage () {
      setValue("offset", getValues("offset") + getValues("limit"))
      handleSubmit(onSubmit)()
  }
  function previousPage () {
      setValue("offset", getValues("offset") - getValues("limit") )
      handleSubmit(onSubmit)()
  }

//   const isMobile = window.Digit.Utils.browser.isMobile();

//   if (isMobile) {
//     return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }}/>
//   }

  // const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo( () => ([
    // {
    //   "name": "id",
    //   "label": "reports.hrms.id",
    //   "type": "string",
    //   "source": "eg_hrms_employee"
    // }
    ]), [] )

  return (
    <div>
      <SearchForm handleSubmit={handleSubmit}>
        <SearchReportFields {...{ register, handleSubmit, control, reset, tenantId, t }} />
      </SearchForm>
      
      {ReportsData?.display ? <Card style={{ marginTop: 20 }}>
                {
                t(ReportsData.display)
                    .split("\\n")
                    .map((text, index) => (
                    <p key={index} style={{ textAlign: "center" }}>
                        {text}
                    </p>
                    ))
                }
            </Card>
            : ReportsData !== "" && <Table
                t={t}
                data={ReportsData}
                totalRecords={props.count}
                columns={columns}
                getCellProps={(cellInfo) => {
                return {
                    style: {
                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
                    padding: "20px 18px",
                    fontSize: "16px"
                  },
                };
                }}
                onPageSizeChange={onPageSizeChange}
                currentPage={getValues("offset")/getValues("limit")}
                onNextPage={nextPage}
                onPrevPage={previousPage}
                pageSizeLimit={getValues("limit")}
                onSort={onSort}
                disableSort={false}
                sortParams={[{id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false}]}
            />}
    </div>
  )
}

export default SearchReport

