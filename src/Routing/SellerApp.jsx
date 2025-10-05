import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "../Seller/Overview";
import SellerLayout from "../Layout/SellerLayout";
import Product from "../Seller/Product/Product";
import Offer from "../Seller/Offer/Offer";
import Commission from '../Seller/Commission/Commission'
import Scheduled from '../Seller/Scheduled/scheduled'
import AddScheduled from '../Seller/Scheduled/AddScheduled'
import AddPayment from '../Seller/Payment/AddPayment'
import Payment from '../Seller/Payment/Payment'
import Addlead from "../Seller/Lead/Addlead";
import AddPaymentFromLead from "../Seller/Payment/AddPaymentFromLead";
import EditScheduled from "../Seller/Scheduled/EditScheduled";
import Leads from "../Seller/Lead/Leads";
import EditLead from "../Seller/Lead/EditLead";
const SellerApp = ({ setRole }) => {
  return (
    <Routes>
      <Route path="/seller" element={<SellerLayout setRole={setRole} />}>
        <Route path="overview" element={<Overview />} />
        <Route path="lead" element={<Leads />} />
        <Route path="addlead" element={<Addlead />} />
        <Route path="editlead" element={<EditLead />} />
        <Route path="product" element={<Product />} />
        <Route path="offer" element={<Offer />} />
        <Route path="commission" element={<Commission />} />
        <Route path="scheduled" element={<Scheduled />} />
        <Route path="addscheduled" element={<AddScheduled />} />
        <Route path="payment" element={<Payment />} />
        <Route path="EditScheduled" element={<EditScheduled />} />
        <Route path="Addpayment" element={<AddPayment />} />
        <Route path="AddPaymentFromLead" element={<AddPaymentFromLead />} />
<Route path="*" element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
};

export default SellerApp;
