CREATE TABLE tasks (
	    id uuid DEFAULT gen_random_uuid() NOT NULL,
	    id_image uuid NOT NULL,
			status character varying, 
	    created_at timestamp without time zone DEFAULT now() NOT NULL,
	    start_processing_at timestamp without time zone DEFAULT NULL,
	    end_processing_at timestamp without time zone DEFAULT NULL,
			error character varying
);


ALTER TABLE tasks OWNER TO "inditex";

CREATE TABLE images (
	  id uuid DEFAULT gen_random_uuid() NOT NULL,
		origin_image_id uuid,
		original_name character varying,
	  md5 character varying NOT NULL,
	  path character varying NOT NULL,
		width numeric NOT NULL,
		height numeric NOT NULL,
		size numeric NOT NULL,
	  created_at timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE images OWNER TO "inditex";


ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


