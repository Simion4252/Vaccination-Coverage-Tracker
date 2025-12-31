--
-- PostgreSQL database dump
--



-- Dumped from database version 17.7 (Debian 17.7-3.pgdg12+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: population_reference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.population_reference (
    id integer NOT NULL,
    region character varying(100) NOT NULL,
    age_group character varying(50) NOT NULL,
    total_population integer NOT NULL
);


ALTER TABLE public.population_reference OWNER TO postgres;

--
-- Name: population_reference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.population_reference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.population_reference_id_seq OWNER TO postgres;

--
-- Name: population_reference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.population_reference_id_seq OWNED BY public.population_reference.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vaccination_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vaccination_data (
    id integer NOT NULL,
    region character varying(100),
    age_group character varying(50),
    gender character varying(20),
    doses_administered integer,
    date_recorded date
);


ALTER TABLE public.vaccination_data OWNER TO postgres;

--
-- Name: vaccination_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vaccination_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vaccination_data_id_seq OWNER TO postgres;

--
-- Name: vaccination_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vaccination_data_id_seq OWNED BY public.vaccination_data.id;


--
-- Name: population_reference id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.population_reference ALTER COLUMN id SET DEFAULT nextval('public.population_reference_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vaccination_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccination_data ALTER COLUMN id SET DEFAULT nextval('public.vaccination_data_id_seq'::regclass);


--
-- Data for Name: population_reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.population_reference (id, region, age_group, total_population) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
1	admin	$2b$10$YBzYAjcGtyKLHCHMzAP7sOAJavbPGXAdL.M6cBPB48Rw2Gr1l0SRi
\.


--
-- Data for Name: vaccination_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vaccination_data (id, region, age_group, gender, doses_administered, date_recorded) FROM stdin;
1	North Region	18-29	Female	120	2023-10-01
2	North Region	30-49	Male	150	2023-10-01
3	North Region	50+	Female	200	2023-10-02
4	South Region	18-29	Male	80	2023-10-01
5	South Region	30-49	Female	110	2023-10-03
6	East Region	50+	Male	95	2023-10-04
7	West Region	18-29	Female	130	2023-10-05
8	North Region	18-29	Male	140	2023-10-06
9	South Region	50+	Female	180	2023-10-07
\.


--
-- Name: population_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.population_reference_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: vaccination_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vaccination_data_id_seq', 9, true);


--
-- Name: population_reference population_reference_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.population_reference
    ADD CONSTRAINT population_reference_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: vaccination_data vaccination_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccination_data
    ADD CONSTRAINT vaccination_data_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--



