import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import { t } from "i18next";
import { formatDate } from "../../../utils/formatDate";

export default function Compensation() {

    const { getResource, loading } = useApi();
    const [compensationData, setCompensationData] = useState({});

    let { id } = useParams();

    useEffect(() => {
        let fetch = async () => {
            try {
                let response = await getResource(id, `${baseURL}compensation`);
                setCompensationData(response?.data);
                console.log(response?.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);

    return (
        <div className="company w-100 mt-2 px-3">
            <h2 className="text-center">
                <Trans i18nKey="compensation-request-details" />
            </h2>
            {!loading && (
                <div className="w-75 mx-auto d-flex flex-column mt-5 gap-2">
                    {/* Warranty Number */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="warranty-number" />
                        </label>
                        <input name=""
                            disabled
                            type="text"
                            className="form-control"
                            value={compensationData?.InsuranceRequestNo}
                        />
                    </div>
                    {/* Created At */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="created-at" />
                        </label>
                        <input name=""
                            disabled
                            type="text"
                            className="form-control"
                            value={formatDate(compensationData?.createdAt)}
                        />
                    </div>
                    {/* Compensation Identification */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="compensation-identification-number" />
                        </label>
                        <input name=""
                            disabled
                            type="text"
                            className="form-control"
                            value={compensationData?.compensationIdentification}
                        />
                    </div>
                    {/* Malfunction Description */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="malfunction-description" />
                        </label>
                        <textarea name=""
                            disabled
                            type="text"
                            className="form-control"
                            value={compensationData?.descMalfunction}
                        />
                    </div>
                    <p><Trans i18nKey='malfunction-images' /></p>
                    <div className="row gap-3">
                    {compensationData?.malfunctionImgs?.map(img=>
                            <div className="col-12 col-lg-3 col-md-6 col-sm-12">
                                    <a href={img?.url} target='_top'>
                                        <img
                                            src={img?.url}
                                            alt="img"
                                            className="image rounded"
                                        />
                                    </a>
                                </div>
                    )}
                    </div>
                    
                </div>
            )}
        </div>
    )
}
