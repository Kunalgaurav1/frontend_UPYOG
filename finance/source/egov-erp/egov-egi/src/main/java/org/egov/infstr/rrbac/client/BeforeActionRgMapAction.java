/*
 * @(#)BeforeActionRgMapAction.java 3.0, 17 Jun, 2013 4:54:32 PM
 * Copyright 2013 eGovernments Foundation. All rights reserved. 
 * eGovernments PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package org.egov.infstr.rrbac.client;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.egov.exceptions.EGOVRuntimeException;
import org.egov.infra.admin.master.service.RoleService;
import org.egov.lib.rrbac.services.RbacService;
import org.egov.lib.rrbac.services.RbacServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class BeforeActionRgMapAction extends Action {
	private static final Logger LOG = LoggerFactory.getLogger(BeforeActionRgMapAction.class);
	private RbacService rbacService = new RbacServiceImpl();
	@Autowired
	private RoleService roleService ;
	
	@Override
	public ActionForward execute(final ActionMapping mapping, final ActionForm form, final HttpServletRequest req, final HttpServletResponse res) throws Exception {
		String target = "";
		try {
			final org.apache.struts.action.DynaActionForm mfb = (org.apache.struts.action.DynaActionForm) form;
			final List acList = rbacService.getActionList();
			final List rList = roleService.getAllRoles();
			Collections.sort(acList);
			Collections.sort(rList);
			req.getSession().setAttribute("actions", acList);
			req.getSession().setAttribute("roles", rList);

			target = "success";
		} catch (final Exception ex) {
			target = "error";
			LOG.error("Exception Encountered!!!" + ex.getMessage());
			throw new EGOVRuntimeException("Exception occured -----> " + ex.getMessage());

		}
		return mapping.findForward(target);

	}
}
