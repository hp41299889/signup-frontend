import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getEmailVerify } from "../api/signup";
import { Modal } from "antd";

const EmailVerify: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");
  useEffect(() => {
    if (id && hash) {
      getEmailVerify(id, hash)
        .then((res) => {
          if (res.data.status === "success") {
            if (res.data.message === "verify success") {
              Modal.success({
                title: "Email驗證成功",
                content: (
                  <>
                    <p>ID：{id}已驗證成功！</p>
                  </>
                ),
              });
            }
          } else {
            throw res;
          }
          console.log(res);
        })
        .catch((err) => {
          Modal.error({
            title: "Email驗證失敗",
            content: "Email驗證失敗",
          });
          console.error(err);
        });
    }
  }, [hash, id]);

  return <></>;
};

export default EmailVerify;
