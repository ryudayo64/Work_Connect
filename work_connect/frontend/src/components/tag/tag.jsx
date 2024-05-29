import React, { useCallback, useState } from 'react'
import { ReactTags } from 'react-tag-autocomplete'

function TagInput () {
  const [selected, setSelected] = useState([])
  const suggestions = [
    { value: 1, label: "清風情報工科学院" },
    { value: 2, label: "ECCコンピュータ専門学校" },
    { value: 3, label: "ＨＡＬ大阪" },
    { value: 4, label: "大阪情報コンピュータ専門学校" },
    { value: 5, label: "日本コンピュータ専門学校" },
    { value: 6, label: "大阪電子専門学校" },
    { value: 7, label: "大阪アミューズメントメディア専門学校" },
    { value: 8, label: "大阪情報ＩＴクリエイター専門学校" },
    { value: 9, label: "近畿コンピュータ電子専門学校" }
  ]

  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag])
    },
    [selected]
  )

  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex))
    },
    [selected]
  )

  const onShouldCollapse  = (value) => {
    return value.length === 0;
  };


  return (
    <ReactTags
      labelText="学校名"
      selected={selected}
      suggestions={suggestions}
      onAdd={onAdd}
      onDelete={onDelete}
      noOptionsText="学校が見つかりませんでした"
      isDisabled ={selected.length >= 2}
      // onShouldCollapse ={onShouldCollapse }
      
      // ariaErrorMessage="学校は1つのみ選択可能です"
    />
  )
}
export default TagInput;