import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import * as wanakana from 'wanakana';
import debounce from 'lodash/debounce'; // インポートを修正

const SchoolNameDropdown = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態
  const [inputValue, setInputValue] = useState(''); // 入力値を管理
  const accessToken = "268|G5fHGAGA7Col8FetXAQ6EMNHnjDIA5TInN2uByIB";

  const schoolTypeCodes = ["F1", "H1"]; // 複数のschool_type_codeを配列として定義

  useEffect(() => {
    if (inputValue) {
      fetchData(inputValue);
    }
  }, [inputValue]); // 入力値が変更されるたびにデータを取得

  const fetchData = debounce(async (query) => {
    setLoading(true);
    let allSchools = [];
    try {
      for (const code of schoolTypeCodes) {
        let hasMore = true;
        let page = 1;

        while (hasMore) {
          const response = await axios.get(`https://api.edu-data.jp/api/v1/school?school_type_code=${code}&pref_code=27&school_name=${query}&page=${page}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`, // アクセストークンをBearerトークンとしてヘッダーに含める
              Accept: 'application/json'
            }
          });

          console.log(`API response for code ${code} and page ${page}:`, response.data); // レスポンスデータを詳細にログ出力

          if (Array.isArray(response.data.schools.data)) {
            allSchools = [...allSchools, ...response.data.schools.data]; // 取得したデータを蓄積
            hasMore = response.data.schools.data.length > 0; // データが存在する限り繰り返す
            page += 1; // 次のページを設定
          } else {
            console.error('Unexpected response format:', response.data);
            hasMore = false;
          }
        }
      }

      setSchools(allSchools);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, 300); // 300msの遅延を設定

  // ドロップダウンで選択された値を状態に設定
  const handleChange = (selectedOption) => {
    setSelectedSchool(selectedOption);
  };

  // 検索入力が変更されたときに呼び出される
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // ドロップダウンのオプションを設定
  const options = schools.map((school) => ({
    value: school.school_code,
    label: school.school_name
  }));

  // カスタムフィルタリング関数
  const filterOption = (option, inputValue) => {
    // 入力値とオプションのラベルを正規化して比較する
    const normalizedLabel = wanakana.toHiragana(option.label.normalize('NFKC').toLowerCase());
    const normalizedInput = wanakana.toHiragana(inputValue.normalize('NFKC').toLowerCase());
    return normalizedLabel.startsWith(normalizedInput);
  };

  return (
    <div>
      <label htmlFor="schoolDropdown">Select a school:</label>
      <Select
        id="schoolDropdown"
        value={selectedSchool}
        onChange={handleChange}
        onInputChange={handleInputChange} // 入力が変更されたときに呼び出される
        options={options}
        placeholder="Select..."
        filterOption={filterOption}
        isLoading={loading} // ローディング状態を表示
      />
    </div>
  );
};

export default SchoolNameDropdown;
