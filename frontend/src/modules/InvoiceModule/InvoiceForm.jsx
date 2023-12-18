// import React, { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

// import { PlusOutlined } from '@ant-design/icons';

// import { DatePicker } from '@/components/CustomAntd';

// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import ItemRow from '@/components/ErpPanel/ItemRow';

// import MoneyInputFormItem from '@/components/MoneyInputFormItem';

// export default function InvoiceForm({ subTotal = 0, current = null }) {
//   const [total, setTotal] = useState(0);
//   const [taxRate, setTaxRate] = useState(0);
//   const [taxTotal, setTaxTotal] = useState(0);
//   const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
//   const handelTaxChange = (value) => {
//     setTaxRate(value);
//   };

//   useEffect(() => {
//     if (current) {
//       const { taxRate = 0, year } = current;
//       setTaxRate(taxRate);
//       setCurrentYear(year);
//     }
//   }, [current]);
//   useEffect(() => {
//     const currentTotal = subTotal * taxRate + subTotal;
//     setTaxTotal((subTotal * taxRate).toFixed(2));
//     setTotal(currentTotal.toFixed(2));
//   }, [subTotal, taxRate]);

//   const addField = useRef(false);

//   useEffect(() => {
//     addField.current.click();
//   }, []);

//   return (
//     <>
//       <Row gutter={[12, 0]}>
//         <Col className="gutter-row" span={9}>
//           <Form.Item
//             name="client"
//             label="Client"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your client!',
//               },
//             ]}
//           >
//             <AutoCompleteAsync
//               entity={'client'}
//               displayLabels={['company']}
//               searchFields={'company,managerSurname,managerName'}
//               // onUpdateValue={autoCompleteUpdate}
//             />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={5}>
//           <Form.Item
//             label="Number"
//             name="number"
//             initialValue={1}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input invoice number!',
//               },
//             ]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={5}>
//           <Form.Item
//             label="year"
//             name="year"
//             initialValue={currentYear}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input invoice year!',
//               },
//             ]}
//           >
//             <InputNumber style={{ width: '100%' }} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={5}>
//           <Form.Item
//             label="status"
//             name="status"
//             rules={[
//               {
//                 required: false,
//                 message: 'Please input invoice status!',
//               },
//             ]}
//             initialValue={'draft'}
//           >
//             <Select
//               options={[
//                 { value: 'draft', label: 'Draft' },
//                 { value: 'pending', label: 'Pending' },
//                 { value: 'sent', label: 'Sent' },
//               ]}
//             ></Select>
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={9}>
//           <Form.Item label="Note" name="note">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="date"
//             label="Date"
//             rules={[
//               {
//                 required: true,
//                 type: 'object',
//               },
//             ]}
//             initialValue={dayjs()}
//           >
//             <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={7}>
//           <Form.Item
//             name="expiredDate"
//             label="Expire Date"
//             rules={[
//               {
//                 required: true,
//                 type: 'object',
//               },
//             ]}
//             initialValue={dayjs().add(30, 'days')}
//           >
//             <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Divider dashed />
//       <Row gutter={[12, 12]} style={{ position: 'relative' }}>
//         <Col className="gutter-row" span={5}>
//           <p>Item</p>
//         </Col>
//         <Col className="gutter-row" span={7}>
//           <p>Description</p>
//         </Col>
//         <Col className="gutter-row" span={3}>
//           <p>Quantity</p>
//         </Col>
//         <Col className="gutter-row" span={4}>
//           <p>Price</p>
//         </Col>
//         <Col className="gutter-row" span={5}>
//           <p>Total</p>
//         </Col>
//       </Row>
//       <Form.List name="items">
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map((field) => (
//               <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
//             ))}
//             <Form.Item>
//               <Button
//                 type="dashed"
//                 onClick={() => add()}
//                 block
//                 icon={<PlusOutlined />}
//                 ref={addField}
//               >
//                 Add field
//               </Button>
//             </Form.Item>
//           </>
//         )}
//       </Form.List>
//       <Divider dashed />
//       <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
//         <Row gutter={[12, -5]}>
//           <Col className="gutter-row" span={5}>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
//                 Save Invoice
//               </Button>
//             </Form.Item>
//           </Col>
//           <Col className="gutter-row" span={4} offset={10}>
//             <p
//               style={{
//                 paddingLeft: '12px',
//                 paddingTop: '5px',
//               }}
//             >
//               Sub Total :
//             </p>
//           </Col>
//           <Col className="gutter-row" span={5}>
//             <MoneyInputFormItem readOnly value={subTotal} />
//           </Col>
//         </Row>
//         <Row gutter={[12, -5]}>
//           <Col className="gutter-row" span={4} offset={15}>
//             <Form.Item
//               name="taxRate"
//               rules={[
//                 {
//                   required: false,
//                   message: 'Please input your taxRate!',
//                 },
//               ]}
//               initialValue="0"
//             >
//               <Select
//                 value={taxRate}
//                 onChange={handelTaxChange}
//                 bordered={false}
//                 options={[
//                   { value: 0, label: 'Tax 0 %' },
//                   { value: 0.19, label: 'Tax 19 %' },
//                 ]}
//               ></Select>
//             </Form.Item>
//           </Col>
//           <Col className="gutter-row" span={5}>
//             <MoneyInputFormItem readOnly value={taxTotal} />
//           </Col>
//         </Row>
//         <Row gutter={[12, -5]}>
//           <Col className="gutter-row" span={4} offset={15}>
//             <p
//               style={{
//                 paddingLeft: '12px',
//                 paddingTop: '5px',
//               }}
//             >
//               Total :
//             </p>
//           </Col>
//           <Col className="gutter-row" span={5}>
//             <MoneyInputFormItem readOnly value={total} />
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import ItemRow from '@/components/ErpPanel/ItemRow';
import MoneyInputFormItem from '@/components/MoneyInputFormItem';

export default function InvoiceForm({ subTotal = 0, current = null }) {
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [locationName, setLocationName] = useState(''); // State to store the location name
  const addField = useRef(false);

  const handleTaxChange = (value) => {
    value = value / 10000;
    setTaxRate(value);
  };

  const taxRatesByLocation = {
    'Alabama': { minLatitude: 30.1374, maxLatitude: 35.008, minLongitude: -88.4743, maxLongitude: -84.888, taxRate: 0.04 },
    'California': { minLatitude: 32.528832, maxLatitude: 42.009517, minLongitude: -124.482003, maxLongitude: -114.131211, taxRate: 0.075 },
    'District of Columbia': { minLatitude: 38.791645, maxLatitude: 38.995774, minLongitude: -77.119759, maxLongitude: -76.909393, taxRate: 0.0575 },
    'Idaho': { minLatitude: 41.988, maxLatitude: 49.001, minLongitude: -117.243, maxLongitude: -111.043, taxRate: 0.06 },
    'Kansas': { minLatitude: 36.993076, maxLatitude: 40.003162, minLongitude: -102.051744, maxLongitude: -94.588388, taxRate: 0.065 },
    'Maryland': { minLatitude: 37.911717, maxLatitude: 39.723037, minLongitude: -79.487651, maxLongitude: -75.039839, taxRate: 0.06 },
    'Alaska': { minLatitude: 51.194358, maxLatitude: 71.538800, minLongitude: -179.148909, maxLongitude: 179.778470, taxRate: 0 }, // No Sales Tax
    'Colorado': { minLatitude: 36.993076, maxLatitude: 41.003444, minLongitude: -109.045223, maxLongitude: -102.041524, taxRate: 0.029 },
    'Florida': { minLatitude: 24.396308, maxLatitude: 31.000888, minLongitude: -87.634938, maxLongitude: -79.974307, taxRate: 0.06 },
    'Arizona': { minLatitude: 31.332177, maxLatitude: 37.004259, minLongitude: -114.818268, maxLongitude: -109.045223, taxRate: 0.056 },
    'Connecticut': { minLatitude: 40.987763, maxLatitude: 42.050587, minLongitude: -73.727775, maxLongitude: -71.185084, taxRate: 0.0635 },
    'Georgia': { minLatitude: 30.355757, maxLatitude: 35.000659, minLongitude: -85.605165, maxLongitude: -80.839729, taxRate: 0.04 },
    'Arkansas': { minLatitude: 33.004106, maxLatitude: 36.499600, minLongitude: -94.617919, maxLongitude: -89.644849, taxRate: 0.065 },
    'Delaware': { minLatitude: 38.451013, maxLatitude: 39.839007, minLongitude: -75.788658, maxLongitude: -74.984699, taxRate: 0 }, // No Sales Tax
    'Hawaii': { minLatitude: 18.7763, maxLatitude: 28.5170, minLongitude: -178.3347, maxLongitude: -154.8067, taxRate: 0.04 },
    'Mississippi': { minLatitude: 30.173943, maxLatitude: 35.008028, minLongitude: -91.655009, maxLongitude: -88.097889, taxRate: 0.07 },
    'Illinois': { minLatitude: 36.993076, maxLatitude: 42.508481, minLongitude: -91.513079, maxLongitude: -87.019935, taxRate: 0.0625 },
    'Kentucky': { minLatitude: 36.498972, maxLatitude: 39.147359, minLongitude: -89.571509, maxLongitude: -81.964971, taxRate: 0.06 },
    'Massachusetts': { minLatitude: 41.186138, maxLatitude: 42.886447, minLongitude: -73.508141, maxLongitude: -69.926398, taxRate: 0.0625 },
    'Indiana': { minLatitude: 37.771742, maxLatitude: 41.761368, minLongitude: -88.097889, maxLongitude: -84.784580, taxRate: 0.07 },
    'Louisiana': { minLatitude: 28.855750, maxLatitude: 33.019543, minLongitude: -94.043047, maxLongitude: -88.816927, taxRate: 0.04 },
    'Michigan': { minLatitude: 41.696118, maxLatitude: 48.238819, minLongitude: -90.418471, maxLongitude: -82.413474, taxRate: 0.06 },
    'Missouri': { minLatitude: 35.995683, maxLatitude: 40.613640, minLongitude: -95.774704, maxLongitude: -89.098843, taxRate: 0.0423 },
    'Montana': { minLatitude: 44.358221, maxLatitude: 49.001494, minLongitude: -116.049735, maxLongitude: -104.039648, taxRate: 0 }, // No sales tax
    'Nevada': { minLatitude: 35.001857, maxLatitude: 42.002207, minLongitude: -120.005746, maxLongitude: -114.039648, taxRate: 0.0685 },
    'New York': { minLatitude: 40.477398, maxLatitude: 45.01585, minLongitude: -74.256800, maxLongitude: -71.185084, taxRate: 0.04 },
    'Oklahoma': { minLatitude: 33.615053, maxLatitude: 37.002207, minLongitude: -103.002207, maxLongitude: -94.430949, taxRate: 0.045 },
    'Rhode Island': { minLatitude: 41.146339, maxLatitude: 42.018798, minLongitude: -71.508141, maxLongitude: -71.185084, taxRate: 0.07 },
    'Texas': { minLatitude: 25.837164, maxLatitude: 36.500704, minLongitude: -106.645646, maxLongitude: -93.508141, taxRate: 0.0625 },
    'Washington': { minLatitude: 45.543541, maxLatitude: 49.002494, minLongitude: -124.848974, maxLongitude: -116.463262, taxRate: 0.065 },
    'New Hampshire': { minLatitude: 42.6978, maxLatitude: 45.305476, minLongitude: -72.558874, maxLongitude: -70.564134, taxRate: 0 }, // No Sales Tax
    'North Carolina': { minLatitude: 33.752878, maxLatitude: 36.588116, minLongitude: -84.319594, maxLongitude: -75.400119, taxRate: 0.0475 },
    'Oregon': { minLatitude: 41.991056, maxLatitude: 46.292035, minLongitude: -124.566244, maxLongitude: -116.463262, taxRate: 0 }, // No Sales Tax
    'South Carolina': { minLatitude: 32.034600, maxLatitude: 35.215402, minLongitude: -83.675086, maxLongitude: -78.499301, taxRate: 0.06 },
    'Utah': { minLatitude: 36.993076, maxLatitude: 42.001073, minLongitude: -114.039648, maxLongitude: -109.045223, taxRate: 0.0595 },
    'West Virginia': { minLatitude: 37.201531, maxLatitude: 40.638801, minLongitude: -82.644741, maxLongitude: -77.719519, taxRate: 0.06 },
    'New Jersey': { minLatitude: 38.928519, maxLatitude: 41.357423, minLongitude: -75.558874, maxLongitude: -73.323111, taxRate: 0.07 },
    'North Dakota': { minLatitude: 45.935072, maxLatitude: 49.000239, minLongitude: -104.053514, maxLongitude: -96.554507, taxRate: 0.05 },
    'Pennsylvania': { minLatitude: 39.719803, maxLatitude: 42.269635, minLongitude: -80.519891, maxLongitude: -74.689502, taxRate: 0.06 },
    'South Dakota': { minLatitude: 42.479635, maxLatitude: 45.94545, minLongitude: -104.057698, maxLongitude: -96.436589, taxRate: 0.04 },
    'Vermont': { minLatitude: 42.726839, maxLatitude: 45.016659, minLongitude: -73.437913, maxLongitude: -71.464056, taxRate: 0.06 },
    'Wisconsin': { minLatitude: 42.49172, maxLatitude: 47.309717, minLongitude: -92.888114, maxLongitude: -86.805415, taxRate: 0.05 },
    'Iowa': { minLatitude: 40.375501, maxLatitude: 43.501196, minLongitude: -96.639485, maxLongitude: -90.140061, taxRate: 0.06 },
    'Maine': { minLatitude: 42.977764, maxLatitude: 47.459686, minLongitude: -71.083924, maxLongitude: -66.934570, taxRate: 0.055 },
    'Minnesota': { minLatitude: 43.499356, maxLatitude: 49.384358, minLongitude: -97.239209, maxLongitude: -89.491739, taxRate: 0.0688 },
    'Nebraska': { minLatitude: 39.999998, maxLatitude: 43.001708, minLongitude: -104.053514, maxLongitude: -95.30829, taxRate: 0.055 },
    'New Mexico': { minLatitude: 31.332177, maxLatitude: 37.004259, minLongitude: -109.045223, maxLongitude: -103.002207, taxRate: 0.0513 },
    'Ohio': { minLatitude: 38.403202, maxLatitude: 42.327132, minLongitude: -84.820159, maxLongitude: -80.518748, taxRate: 0.0575 },
    'Puerto Rico': { minLatitude: 17.922602, maxLatitude: 18.52036, minLongitude: -68.378273, maxLongitude: -65.591004, taxRate: 0.06 },
    'Tennessee': { minLatitude: 34.982924, maxLatitude: 36.678118, minLongitude: -90.310298, maxLongitude: -81.6469, taxRate: 0.07 },
    'Virginia': { minLatitude: 36.540738, maxLatitude: 39.466012, minLongitude: -83.675086, maxLongitude: -75.242266, taxRate: 0.053 },
    'Wyoming': { minLatitude: 40.994746, maxLatitude: 45.005904, minLongitude: -111.054611, maxLongitude: -104.052123, taxRate: 0.04 },
    'Pakistan': { minLatitude: 23.6978, maxLatitude: 37.2719, minLongitude: 60.8714, maxLongitude: 77.0369, taxRate: 0.20 },
    'Germany': { minLatitude: 47.2701, maxLatitude: 55.0584, minLongitude: 5.8663, maxLongitude: 15.0419, taxRate: 0.19 },
  };

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year } = current;
      setTaxRate(taxRate);
      setCurrentYear(year);
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = (taxTotal * 100) + subTotal;
    setTaxTotal(((subTotal * taxRate)).toFixed(2));
    setTotal(currentTotal.toFixed(2));
  }, [subTotal, taxRate, taxTotal]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        let currentLocation = 'Other'; // Default location

        for (const location in taxRatesByLocation) {
          const { minLatitude, maxLatitude, minLongitude, maxLongitude, taxRate } = taxRatesByLocation[location];
          if (
            latitude >= minLatitude &&
            latitude <= maxLatitude &&
            longitude >= minLongitude &&
            longitude <= maxLongitude
          ) {
            currentLocation = location;
            setTaxRate(taxRate / 100);
            setLocationName(currentLocation);
            break;
          }
        }
      });
    } else {
      alert("Geolocation is not available in your browser");
    }
  }, []);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={9}>
          <Form.Item
            name="client"
            label="Client"
            rules={[
              {
                required: true,
                message: 'Please input your client!',
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'client'}
              displayLabels={['company']}
              searchFields={'company,managerSurname,managerName'}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="Number"
            name="number"
            initialValue={1}
            rules={[
              {
                required: true,
                message: 'Please input invoice number!',
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="year"
            name="year"
            initialValue={currentYear}
            rules={[
              {
                required: true,
                message: 'Please input invoice year!',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="status"
            name="status"
            rules={[
              {
                required: false,
                message: 'Please input invoice status!',
              },
            ]}
            initialValue={'draft'}
          >
            <Select
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'pending', label: 'Pending' },
                { value: 'sent', label: 'Sent' },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={9}>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={7}>
          <Form.Item
            name="expiredDate"
            label="Expire Date"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={5}>
          <p>Item</p>
        </Col>
        <Col className="gutter-row" span={7}>
          <p>Description</p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p>Quantity</p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p>Price</p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p>Total</p>
        </Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                Save Invoice
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4} offset={10}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Sub Total :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={subTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <Form.Item
              label={`Tax Rate (${(taxRate * 10000).toFixed(2)}%)`} // Display current tax rate as a percentage in the label
              name="taxRate"
              rules={[
                {
                  required: false,
                  message: 'Please input your taxRate!',
                },
              ]}
            >

              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${(value * 1).toFixed(2)}%`} // Format the value as a percentage
                onChange={handleTaxChange} // Allow the user to change the tax rate

              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginTop: "30px" }}>
            <MoneyInputFormItem readOnly value={taxTotal * 100} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Total :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={total} />
          </Col>
        </Row>
      </div>
    </>
  );
}

