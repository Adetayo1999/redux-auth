import React, { useEffect } from 'react';
import { fetchUserDetails } from '../app/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  const { loading, user } = useSelector((state) => state.user);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          <p>
            Welcome {user.firstName} {user.lastName}
          </p>
          <img
            src={user.picture}
            alt={user.firstName}
            className="rounded-[50%] h-[50px] w-[50px]"
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
