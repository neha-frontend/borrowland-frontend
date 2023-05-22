import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  saveSettingsAction,
  getSettingsAction,
  resetSettings,
} from "store/sagaActions";
import { RenderIf } from "utils";
import { Spinner } from "components";

import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();

  const {
    savingIntrestPreference,
    autoCollateralTransfer,
    fixedTerms,
    isLoading,
  } = useSelector((state) => state.user.setting);

  const initialValue = {
    savingIntrestPreference: savingIntrestPreference,
    autoCollateralTransfer: autoCollateralTransfer,
    fixedTerms: fixedTerms,
  };

  const [settingsValue, setSettingsValue] = useState({
    savingIntrestPreference: savingIntrestPreference,
    autoCollateralTransfer: autoCollateralTransfer,
    fixedTerms: fixedTerms,
  });

  const handleSettingChange = (e) => {
    const { field, value } = e.target;
    setSettingsValue({ ...settingsValue, [field]: value });
  };

  useEffect(() => {
    dispatch(resetSettings());
    dispatch(getSettingsAction());
  }, []);

  useEffect(() => {
    setSettingsValue({ ...initialValue });
  }, [savingIntrestPreference, autoCollateralTransfer, fixedTerms]);

  useEffect(() => {
    if (JSON.stringify(initialValue) !== JSON.stringify(settingsValue)) {
      dispatch(saveSettingsAction({ data: settingsValue }));
    }
  }, [settingsValue]);

  return (
    <>
      <div className="border_box p-sm-4 p-3">
        <p className="title setting_main_title">Savings Interest Preferences</p>
        <RenderIf isTrue={isLoading}>
          <Spinner className="m-20-auto" id="dashboardSpinner" />
        </RenderIf>
        <RenderIf isTrue={!isLoading}>
          <div className="w-100 pt-4">
            <div className="p-sm-4 p-2 d-flex market_box bgblue settings_check_flex">
              <div className="position-relative width_40 custom_radio mr-3">
                <input type="radio" value="savingIntrestPreference" checked />
                <span className="checkmark"></span>
              </div>

              {/* keeping the code if changes required again 
               <label className="switch mr-3 mt-1">
                <input
                  type="radio"
                  name="savingIntrestPreference"
                  value="savingIntrestPreference"
                  checked={settingsValue.savingIntrestPreference}
                  onChange={(e) =>
                    handleSettingChange({
                      target: {
                        field: e.target.name,
                        value: !settingsValue.savingIntrestPreference,
                      },
                    })
                  }
                />
                <span className="slider round"></span>
              </label> */}
              <div className="d-flex flex-column setting_text_container">
                <p className="setting_title">Savings Interest Preferences</p>
                <p className="setting_text">
                  For example, top up BTC and receive your interest in BTC
                </p>
              </div>
            </div>
          </div>
        </RenderIf>

        {/* Loan */}
        <p className="title pt-4 setting_main_title">Loan</p>
        <RenderIf isTrue={isLoading}>
          <Spinner className="m-20-auto" id="dashboardSpinner" />
        </RenderIf>
        <RenderIf isTrue={!isLoading}>
          <div className="mt-4 market_box bgblue p-sm-4 p-2">
            <div className="w-100 pt-3">
              <div className="d-flex settings_check_flex">
                <div className="custom_checkbox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="autoCollateralTransfer"
                      value="autoCollateralTransfer"
                      checked={settingsValue.autoCollateralTransfer}
                      onChange={(e) =>
                        handleSettingChange({
                          target: {
                            field: e.target.name,
                            value: !settingsValue.autoCollateralTransfer,
                          },
                        })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="d-flex flex-column setting_text_container">
                  <p className="setting_title">Automatic Collateral Transfer</p>
                  <p className="setting_text">
                    When Automatic Collateral Transfer is enabled, in events
                    when the assets in your Credit Line Wallets do not cover the
                    required Loan-to-Value ratio, the Borrowland blockchain
                    oracle automatically transfers small portion assets from the
                    Savings Wallets to the Credit Line Wallets to fulfil the gap
                    and keep your loan health at check, thus protecting your
                    crypto from automatic repayments.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-100 pt-3">
              <div className="pt-4 d-flex settings_check_flex">
                <div className="custom_checkbox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="fixedTerms"
                      value="fixedTerms"
                      checked={settingsValue.fixedTerms}
                      onChange={(e) =>
                        handleSettingChange({
                          target: {
                            field: e.target.name,
                            value: !settingsValue.fixedTerms,
                          },
                        })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="d-flex flex-column setting_text_container">
                  <p className="setting_title">Unlock Fixed Terms</p>
                  <p className="setting_text">
                    When Unlock Fixed Terms is enabled and all FLEX Terms are
                    already transferred from the Savings Wallet to the Credit
                    Line Wallet, the Borrowland blockchain oracle automatically
                    starts unlocking current Fixed Terms and transfers assets
                    from the Savings Wallets to the Credit Line Wallets to
                    prevent automatic repayments. FLEX Terms are always
                    transferred with priority, thus protecting active Fixed
                    Terms. Automatically unlocked Fixed Terms lose the accrued
                    interest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RenderIf>
      </div>
    </>
  );
};

export default Settings;
