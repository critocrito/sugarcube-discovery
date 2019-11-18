import React, {useEffect, useState} from "react";

interface PreferencesProps {
  save: (key: string, value: string) => void;
  restore: (key: string) => Promise<string | null>;
}

const Preferences = ({save, restore}: PreferencesProps) => {
  const [setting, setSetting] = useState();

  useEffect(() => {
    const f = async () => {
      const option = await restore("setting");
      setSetting(option);
    };
    f();
  }, [restore]);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetting(e.target.value);
  };

  const storePreferences = () => {
    save("setting", setting);
  };

  return (
    <div>
      <input
        type="text"
        id="setting"
        onChange={handleSettingChange}
        defaultValue={setting}
      />
      <button type="button" onClick={storePreferences}>
        Save
      </button>
    </div>
  );
};

export default Preferences;
