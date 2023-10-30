import React, { useEffect, useState } from 'react'
import { useApi } from '../../../contexts/apiContext';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '../../../APIs/baseURL';
import { Trans } from 'react-i18next';

export function Message() {
    const { getResource, loading} = useApi();
    const [messageData, setMessageData] = useState({});

    let { id } = useParams();

    useEffect(() => {
        let fetch = async () => {
            try {
                let response = await getResource(id, `${baseURL}contactus`);
                setMessageData(response?.data);
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
                <Trans i18nKey="message-details" />
            </h2>
            {!loading && (
                <div className="w-75 mx-auto d-flex flex-column mt-5 gap-2">
                    {/* Name */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="name" />
                        </label>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            value={messageData?.name}
                        />
                    </div>
                    {/* Email */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="email" />
                        </label>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            value={messageData?.email}
                        />
                    </div>
                    {/* Phone */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="phone" />
                        </label>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            value={messageData?.phone}
                        />
                    </div>
                    {/* Message */}
                    <div className="form-group">
                        <label>
                            <Trans i18nKey="message" />
                        </label>
                        <textarea
                            disabled
                            type="text"
                            className="form-control"
                            value={messageData?.message}
                        />
                    </div>
                    {/* Button */}
                    <div className="form-group mx-auto">
                        <Link className='btn btn-warning' to='/admindashboard/messages'>
                            <Trans i18nKey='back-to-all-messages' />
                        </Link>
                    </div>
                </div>
            )}
        </div>
  )
}
