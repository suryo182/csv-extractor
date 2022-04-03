import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Modal,
  Upload,
  Checkbox,
  Divider,
  Table,
  Tag,
  Space,
} from 'antd';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const CheckboxGroup = Checkbox.Group;
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const ScreenOne = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data.length > 0) {
      const arrayOfKeys = Object.keys(data[0]);

      const arrayOfObjColumn = [];
      arrayOfKeys.forEach((key) => {
        const objColumn = {
          title: '',
          dataIndex: '',
          key: '',
          render: '',
        };

        if (key === '') {
          objColumn.title = 'No';
          objColumn.dataIndex = 'index';
          objColumn.key = 'index';
          objColumn.render = (text, record, index) =>
            (page - 1) * 10 + index + 1;
        } else {
          objColumn.title = key;
          objColumn.dataIndex = key;
          objColumn.key = key;
        }

        arrayOfObjColumn.push(objColumn);
      });
      setColumns(arrayOfObjColumn);
    }
  }, [data.length, page]);

  const csvToArray = (str, delimiter = ',') => {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf('\n')).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map((row) => {
      const values = row.split(delimiter);
      const el = headers.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  };

  const props = {
    onChange(info) {
      if (info.file.status !== 'uploading') {
        const input = info.file.originFileObj;
        const reader = new FileReader();

        reader.onload = (e) => {
          const text = e.target.result;
          const arrayOfObj = csvToArray(text);
          setData(arrayOfObj);
        };

        reader.readAsText(input);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <section className="container mx-auto py-20">
      <Modal
        title="Filter by"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Modal>
      <div className="mb-20">
        <Link href="/">
          <a className="font-medium text-lg underline">Back to Home</a>
        </Link>
      </div>

      <div>
        <div className="flex justify-between mb-10">
          <Button type="primary" onClick={showModal}>
            Filter By
          </Button>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>

        <div>
          {columns.length > 0 && data.length > 0 && (
            <Table
              rowKey="ID"
              columns={columns}
              dataSource={data}
              pagination={{
                onChange(current) {
                  setPage(current);
                },
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ScreenOne;
