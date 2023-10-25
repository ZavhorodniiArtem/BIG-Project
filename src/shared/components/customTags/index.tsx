import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag } from 'antd';
import { TagsProps } from '@/shared/components/customTags/types.ts';

const CustomTags = ({ tags, setTags }: TagsProps) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();
  }, [inputVisible]);

  const showInput = () => setInputVisible(true);

  const handleClose = (removedTag: string) => {
    const newTags: string[] = tags.filter((tag: string) => tag !== removedTag);
    setTags(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className="flex">
      <div className="mr-7">
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            className="mr-1.5 w-[78px]"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag onClick={showInput} className="px-2 bg-transparent">
            <PlusOutlined /> Add tag
          </Tag>
        )}
      </div>

      <div>
        {tags.map((tag: string) => {
          return (
            <Tag
              closable
              onClose={(e) => {
                e.preventDefault();
                handleClose(tag);
              }}
              className="mb-3 bg-transparent"
              key={tag}
            >
              # {tag}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTags;
