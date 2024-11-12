import { useState } from 'react';
import MypageHeader from '../components/Mypage/MypageHeader';

const MypagePage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('취미');

  const handleComponentSelect = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <MypageHeader onComponentSelect={handleComponentSelect} />
      <div>
        {selectedComponent === '취미' && <div>취미페이지</div>}
        {selectedComponent === '내 정보' && <div>내정보페이지</div>}
      </div>
    </div>
  );
};

export default MypagePage;
