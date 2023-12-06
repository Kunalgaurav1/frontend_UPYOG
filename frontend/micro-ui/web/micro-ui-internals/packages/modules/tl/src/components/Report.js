import React, { useState, useEffect } from "react";
import { Header } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchReport from "./SearchReport";



function Report({initialStates = {}, isReport, ...props}) {
  const { t } = useTranslation();
  let isMobile = window.Digit.Utils.browser.isMobile();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const language = Digit.StoreData.getCurrentLanguage();

  const [pageOffset, setPageOffset] = useState(initialStates?.pageOffset || 0);
  const [pageSize, setPageSize] = useState(initialStates?.pageSize || 10);
  const [sortParams, setSortParams] = useState(initialStates?.sortParams || [{ id: "applicationDate", desc: false }]);
  const [setSearchFieldsBackToOriginalState, setSetSearchFieldsBackToOriginalState] = useState(false);
  const [searchParams, setSearchParams] = useState(() => {
    return initialStates?.searchParams || {};
  });
  let paginationParams = isMobile ? { limit: 100, offset: 0, sortBy: sortParams?.[0]?.id, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" } : { limit: pageSize, offset: pageOffset, sortBy: sortParams?.[0]?.id, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" };


  // const handleFilterChange = (filterParam) => {
  //   let keys_to_delete = filterParam?.delete;
  //   let _new = {};
  //   if (isMobile) {
  //     _new = { ...filterParam };
  //   } else {
  //     window.scrollTo(0,0);
  //     _new = { ...searchParams, ...filterParam };
  //   }
  //   // let _new = { ...searchParams, ...filterParam };
  //   // if (keys_to_delete) keys_to_delete.forEach((key) => delete _new[key]);
  //   // delete filterParam.delete;
  //   if (keys_to_delete) keys_to_delete.forEach((key) => delete _new[key]);
  //   delete _new?.delete;
  //   delete filterParam?.delete;
  //   setSetSearchFieldsBackToOriginalState(true);
  //   setSearchParams({ ..._new });
  //   setEnableSearch({ enabled: true });
  // };



  return (
    <div>

      <Header>{t("ES_COMMON_REPORT")}</Header>

      <SearchReport
      t={t} yarn
      // moduleCode = "TL"
      language={language}
      tenantId={tenantId} 
      // onSearch={handleFilterChange} 
      {...props} 
      />







    </div>
  )
}

export default Report