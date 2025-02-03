SELECT 
    s.name as school, 
	sa.admin_username as email,
    ss.name as session,
	sse.label as label_DA,
	sse.value as value_DA
FROM 
    schools s
LEFT JOIN 
    school_admins sa ON s.id = sa.school_id
LEFT JOIN 
    session_students ss ON s.id = ss.id_school
LEFT JOIN 
    session_emission_categories ssec ON ss.id = ssec.id_session_student
LEFT JOIN 
    session_emission_sub_categories ssesc ON ssec.id = ssesc.id_session_emission_category
LEFT JOIN 
    session_emissions sse ON ssesc.id = sse.id_session_emission_sub_category
