// import { useAbility } from '@/features/access-control/context';
// import { Actions, Subjects } from '@/features/access-control/types';
// import { Can } from '@casl/react';
// import React from 'react';

// interface ProtectedComponentProps {
//   action: Actions;
//   subject: Subjects | undefined;
//   children: React.ReactNode;
// }

// const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
//   action,
//   subject,
//   children,
// }) => {
//   const ability = useAbility();

//   // Kiểm tra quyền truy cập, chỉ thực hiện nếu subject có giá trị
//   const hasPermission = subject ? ability.can(action, subject) : false;

//   // Nếu không có quyền nhưng subject là Inventory (một phần của Inventory), cho phép hiển thị
//   if (!hasPermission && subject && subject.includes('Inventory')) {
//     return <>{children}</>;
//   }

//   // Nếu subject là undefined, không thể tiếp tục
//   if (!subject) {
//     return null; // Hoặc bạn có thể trả về fallback gì đó nếu cần
//   }

//   return (
//     <Can I={action} a={subject} ability={ability}>
//       {children}
//     </Can>
//   );
// };

// export default ProtectedComponent;
