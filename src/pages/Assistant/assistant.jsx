import React, { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../api/api";
import { FaCheck } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import Select from 'react-select';
import { showToast } from '../../services/toastifyservices';
import { formatText } from "../../helper/index";
import CommonSpinner from '../../services/commonSpinner'

import './assistant.css';

const Assistant = () => {
    const [providers, setProviders] = useState([]);
    const [dictations, setDictations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [provider_id, setProviderId] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const { data } = await getRequest("assistant_api/get-providers");
                setProviders(data.providers || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);
    //--------------------------on Search Button---------------------//
    const handleSearch = async (e) => {
        if (e) {
            e.preventDefault();
        }
        setLoading(true);
        const Payload = {
            provider_id: provider_id,
            status: status,
            date: date,
        };
        try {
            const response = await postRequest("assistant_api/get-provider-dictations", Payload);
            setLoading(false);
            const result = response.data;
            console.log("dictations", result);
            setDictations("");
            if (result.status) {
                debugger
                if (result.dictations.length > 0) {
                    showToast('success', '', result.message);
                    const formattedDictations = result.dictations.map((dictation) => ({
                        ...dictation,
                        soap_note: dictation.soap_note ? formatText(dictation.soap_note) : dictation.soap_note
                    }));
                    setDictations(formattedDictations || []);
                } else {
                    showToast('error', '', "No Record Found");

                }
            } else {
                showToast('error', '', result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //-------------------Mark As Done Function-------------------//
    const markAsDone = async (id) => {
        debugger
        try {
            setLoading(true);
            const payload = {
                dictation_id: id,
            };
            const response = await postRequest("assistant_api/update-dictation-status", payload);
            const result = response.data;
            if (result.status) {
                showToast('success', '', result.message);
                handleSearch();
            }

        } catch (error) {
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mt-3 p-2 md:p-10 bg-gray-200">
            <div className="card">
                <div className="card-header">
                    <h3 className="text-start text-primary-emphasis font-bold">Assistant</h3>
                </div>
                <form onSubmit={handleSearch}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label
                                    htmlFor="providerselect"
                                    className="form-label font-bold"
                                    style={{ minWidth: "100px" }}
                                >
                                    Provider
                                </label>
                                <select
                                    className="form-select "
                                    aria-label="Default select example"
                                    id="providerselect"
                                    value={provider_id}
                                    onChange={(e) => setProviderId(e.target.value)}
                                    required
                                >
                                    <option value="">Select Name</option>
                                    {providers.map((provider) => (
                                        <option key={provider.azz_id} value={provider.azz_id}>
                                            {provider.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label
                                    htmlFor="datePicker"
                                    className="form-label font-bold"
                                    style={{ minWidth: "100px" }}
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="datePicker"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label
                                    htmlFor="statusSelect"
                                    className="form-label font-bold"
                                    style={{ minWidth: "100px" }}
                                >
                                    Status
                                </label>
                                <select
                                    className="form-select "
                                    aria-label="Default select example"
                                    id="statusSelect"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value=""> </option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="col-md-3 mt-4">

                                <button className="btn btn-primary mt-2  fw-bold btncolor" type="submit">Search</button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
            
            {dictations.length > 0 && (
                <div className="mt-3">
                    {dictations.map((dictation, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <p className="text-uppercase mb-0">
                                            <b>Patient Name:</b> {dictation.patient_name}
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        {dictation.status === "pending" && (
                                            <button className="btn btn-success d-inline-flex align-items-center" onClick={() => markAsDone(dictation.id)}>
                                                <FaCheck className="me-2" />
                                                <span>Mark As Done</span>
                                            </button>
                                        )}

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <Accordion defaultActiveKey="0" alwaysOpen className="custom-accordion">
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header><b>Soap Note</b></Accordion.Header>
                                            <Accordion.Body>
                                                {/* Rendering formatted HTML content using dangerouslySetInnerHTML */}
                                                <div
                                                    className="mb-0"
                                                    dangerouslySetInnerHTML={{ __html: dictation.soap_note }}
                                                ></div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {loading && <CommonSpinner />}
        </div>
    );
};

export default Assistant;
