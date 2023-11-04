import React, { useState } from 'react'
import {useEffect} from 'react';
import './WarrantyContract.css'
import vatLogo from '../assets/images/Vat-logo.svg';
import qrCode from '../assets/images/qr-code.svg';
import logo from '../assets/images/logo.png'
import jwtDecode from 'jwt-decode';
import { useApi } from '../contexts/apiContext';
import { baseURL } from '../APIs/baseURL';

export const WarrantyContract = () => {

  let {getResource} = useApi();
  let {contractData, setContractData} = useState({});

  useEffect(()=>{
    const fetch = async ()=>{
      const decodedToken = jwtDecode(localStorage.getItem('token'));

        if (decodedToken && decodedToken.id) {
          const { id } = decodedToken;
          let res  = await getResource(id, `${baseURL}insuranceRequest`);
          if(res?.message === 'success')
          setContractData(res?.data);
        }
    }

    fetch();
  },[])

  return (
    <div className='Container m-5 p-5 w-100'>
      {console.log(contractData)}
      <button type="button" className="btn btn-primary w-25 mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
        اعرض عقد الضمان
      </button>

      <div class="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div className='container h-25 w-75'>
                <div className='background-img mt-5 @media print '></div>

                <div className="row">

                  <div className='col-6 d-flex flex-column align-items-start text-center mt-3'>

                    <div className="align-items-center">
                      <div className=''></div>
                      <p className='mt-2'>تاريخ الاصدار : <strong>2023/10/11</strong></p>
                      <p className='mt-2'>رقم الضمان : <strong>24342352655534</strong></p>
                    </div>
                  </div>
                  <div className='col-6 d-flex flex-column align-items-end text-center mt-3'>
                    <div className="align-items-center">
                      <img src={logo} alt="logo" width={100} />
                      <p className='mt-2 fw-bold'>Strong Care</p>
                    </div>
                  </div>
                  <div className=" mt-1">
                    <div className='d-flex align-items-center'>
                      <hr className="flex-grow-1 border border-primary border-2 opacity-50" />
                      <div className="d-flex flex-column align-items-center">
                        <img src={vatLogo} width={150} alt='' />
                      </div>
                      <hr className="flex-grow-1 border border-primary border-2 opacity-50" />
                    </div>

                    <div className="jutify-content-center text-center mt-3">
                      <p className='fw-bold fs-4'>Strong Care شهادة تسجبل عقد ضمان مع شركة </p>
                      <p className='fw-bold fs-5'>Warranty Registration Certificate with Strong Care</p>
                    </div>
                    <div className='justify-content-end d-flex mt-5'>
                      <p className='text-dark fs-5 fw-bold' >
                        تشهد شركة
                        <span dir="ltr"> strong care </span>
                        بأن العميل ادناه قام بعمل عقد الضمان الاتي  بتاريخ
                        2023/10/11
                      </p>

                    </div>
                    <div className='justify-content-start d-flex mt-2'>

                      <p className='text-dark fs-5 fw-bold'>
                        The company <strong>Strong Care</strong> certifies that the customer below has entered into the following warranty contract on <strong>11th October 2023</strong>.

                      </p></div>



                  </div>

                  <div className='row my-5 '>

                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Customer's Name :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>الاقصى</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> : اسم العميل</p>
                    </div>

                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Warranty Number :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>532465246</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> : رقم الضمان</p>
                    </div>


                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Device Manufacturer's Name :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>ِapple</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> :  اسم شركة الجهاز</p>
                    </div>

                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Device type :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>apple 13 pro max</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> :  نوع الجهاز</p>
                    </div>


                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Device color :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>gold</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> :  لون الجهاز</p>
                    </div>


                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Device Serial Number :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>4532634634</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> :  الرقم التسلسلي للجهاز </p>
                    </div>


                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Customer phone Number :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>01125435565</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'> :  رقم الهاتف الخاص بالعميل   </p>
                    </div>


                    <div className='col-4 d-flex flex-column align-items-start text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>Email :</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-center text-center mt-3'>
                      <p className='text-dark fs-5 خحشؤهفغ-75'>mohamed76@gmail.com</p>

                    </div>
                    <div className='col-4 d-flex flex-column align-items-end text-center mt-3'>
                      <p className='text-dark fs-5 fw-bold'>: البريد الالكتروني </p>
                    </div>


                  </div>
                  <div className="justify-content-center d-flex my-4  ">
                    <img src={qrCode} alt="qr code" width={100} />
                  </div>
                  <div className="justify-content-center d-flex my-5 flex-column ">
                    <p className='fw-bold fs-3 text-center text-dark'>هذه الوثيقة مرسلة من النظام الالي ولا تحتاج الا توقيع</p>
                    <p className='fw-bold fs-3 text-center'> <span dir="ltr"> Strong Care </span>شركة</p></div>

                </div>
              </div>


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">طباعة</button>
            </div>
          </div>
        </div>
      </div>



    </div>

  )
}